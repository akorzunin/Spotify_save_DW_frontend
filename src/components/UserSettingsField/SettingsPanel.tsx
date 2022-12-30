import React, { useState, useEffect, FC } from 'react';
import AccountStatus from './AccountStatus';
import SettingsTitle from './SettingsTitle';
import {
    getUserData,
    createUser,
    getDbData,
    parseDateFromDb,
    updateUserData,
    parseFormData,
    parseFormOutputDate,
} from '../../utils/dbManager';
import { formDataMap } from '../../interfaces/FormDataMap';
import { BaseButtonClass } from '../Buttons/BaseButton';
import Button from '../Buttons/BaseButton';

export const TextFormStyle =
    'w-full mb-3 appearance-none block bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white';
export const CheckboxFormStyle =
    'w-4 h-4 bg-gray-100 rounded border-transparent focus:border-transparent focus:ring-0 cursor-pointer';
export const HintFormStyle =
    'text-sm font-light text-white bg-gray-500 absolute max-w-[192px] rounded-md transition-all duration-600 ease-in-out text-shadow-md';

const SettingsPanel: FC = ({ IsPremium, userId, cookie, DwPlaylistId }) => {
    const [AutosaveHint, setAutosaveHint] = useState(false);
    const [FilterDislikesHint, setFilterDislikesHint] = useState(false);
    const [SaveFullPlHint, setSaveFullPlHint] = useState(false);
    const [SendmailHint, setSendmailHint] = useState(false);
    const [SubmitMessage, setSubmitMessage] = useState('');
    const showHint = (event) => {
        if (event) {
            if (event.target.id == 'autosave') {
                setAutosaveHint(true);
            }
            if (event.target.id == 'email-checkbox-label') {
                setSendmailHint(true);
            }
            if (event.target.id == 'filter-dislikes') {
                setFilterDislikesHint(true);
            }
            if (event.target.id == 'save-full-playlist') {
                setSaveFullPlHint(true);
            }
        }
    };
    const hideHint = (event) => {
        if (event) {
            if (event.target.id == 'autosave') {
                setAutosaveHint(false);
            }
            if (event.target.id == 'email-checkbox-label') {
                setSendmailHint(false);
            }
            if (event.target.id == 'filter-dislikes') {
                setFilterDislikesHint(false);
            }
            if (event.target.id == 'save-full-playlist') {
                setSaveFullPlHint(false);
            }
        }
    };
    const handleSubmit = (event) => {
        let formData = {};
        Array.from(event.currentTarget.elements).map((item: any) => {
            if (!item.id) return null;
            if (item.type === 'checkbox') {
                return (formData[item.id] = item.checked);
            }
            if (item.type === 'datetime-local') {
                if (item.value) {
                    return (formData[item.id] = parseFormOutputDate(
                        item.value
                    ));
                }
            }
            if (item.value) {
                return (formData[item.id] = item.value);
            }
            formData[item.id] = '';
        });
        console.table(formData);
        const updateData = parseFormData(formData, formDataMap);
        updateUserData(userId, updateData);
    };

    const setFormData = (data) => {
        Array.from(document.forms[0]).map((item: any) => {
            // console.log(item.type)
            if (item.type === 'checkbox') {
                return (item.checked = getDbData(item, data, formDataMap));
            }
            if (item.type === 'datetime-local') {
                return (item.value = parseDateFromDb(data, item, formDataMap));
            }
            if (item.type === 'submit') {
                return;
            }
            return (item.value = getDbData(item, data, formDataMap));
        });
    };
    // automatically pick up dw palylist id for user
    useEffect(() => {
        if (DwPlaylistId) {
            // @ts-ignore cause this form always exist
            document.forms[0][3].value = DwPlaylistId;
        }
    }, [DwPlaylistId]);

    useEffect(() => {
        getUserData(userId).then((data) => {
            if (!data) {
                // create user
                const userData = {
                    user_id: userId,
                    is_premium: IsPremium,
                    refresh_token: cookie.refresh_token,
                };
                createUser(userId, userData);
            }
            console.table(data);
            // set user settings
            setFormData(data);
        });
    }, []);
    const [emailFormActive, setEmailFormActive] = useState(false);
    const handleShowEmailField = (e) => {
        setEmailFormActive(e.target.checked);
    };

    return (
        <div className="w-[448px] mb-3">
            <SettingsTitle />
            <AccountStatus IsPremium={IsPremium} />
            <div className="mx-3 mt-3 bg-green-500 rounded-md p-3 bg-opacity-20">
                <form onSubmit={handleSubmit} className="w-full max-w-lg">
                    <div className="flex items-center relative mb-4">
                        <input
                            id="email-checkbox"
                            type="checkbox"
                            value=""
                            className={`${CheckboxFormStyle}`}
                            onChange={handleShowEmailField}
                        ></input>
                        <label
                            id="email-checkbox-label"
                            htmlFor="email-checkbox"
                            className="whitespace-nowrap mx-2 font-medium text-gray-900 cursor-pointer"
                            onMouseEnter={showHint}
                            onMouseLeave={hideHint}
                        >
                            Send weekly email
                        </label>
                        {SendmailHint && (
                            <p className={`${HintFormStyle} right-[30px] p-3`}>
                                Send email everery week at Sunday to not
                                forget/inform about DW playlist save
                            </p>
                        )}
                    </div>
                    {emailFormActive && (
                        <div>
                            <input
                                id="email-input"
                                className={`${TextFormStyle}`}
                                type="email"
                                placeholder="Email"
                            />
                            <input
                                className={`${TextFormStyle}`}
                                id="email-date-input"
                                type="datetime-local"
                            />
                        </div>
                    )}
                    <div className="flex-none">
                        <label
                            id="dw-link-label"
                            htmlFor="dw-link"
                            className="whitespace-nowrap mx-2 font-medium text-gray-900"
                        >
                            Dw playlist id
                        </label>
                        <input
                            id="dw-link"
                            type="text"
                            defaultValue=""
                            placeholder="Discover Weekly playlist id"
                            className={`${TextFormStyle}`}
                        ></input>
                    </div>
                    <div className="flex items-center relative mb-4">
                        <input
                            id="autosave-checkbox"
                            type="checkbox"
                            value=""
                            className={`${CheckboxFormStyle}`}
                        ></input>
                        <label
                            id="autosave"
                            htmlFor="autosave-checkbox"
                            className="whitespace-nowrap mx-2 font-medium text-gray-900"
                            onMouseEnter={showHint}
                            onMouseLeave={hideHint}
                        >
                            Autosave
                        </label>
                        <input
                            id="filter-dislikes-checkbox"
                            type="checkbox"
                            value=""
                            className={`${CheckboxFormStyle}`}
                        ></input>
                        <label
                            id="filter-dislikes"
                            htmlFor="filter-dislikes-checkbox"
                            className="whitespace-nowrap mx-2 font-medium text-gray-900"
                            onMouseEnter={showHint}
                            onMouseLeave={hideHint}
                        >
                            Filter dislikes
                        </label>
                        <input
                            id="save-full-playlist-checkbox"
                            type="checkbox"
                            value=""
                            className={`${CheckboxFormStyle}`}
                        ></input>
                        <label
                            id="save-full-playlist"
                            htmlFor="save-full-playlist-checkbox"
                            className="whitespace-nowrap mx-2 font-medium text-gray-900"
                            onMouseEnter={showHint}
                            onMouseLeave={hideHint}
                        >
                            Save full playlist
                        </label>
                        {AutosaveHint && (
                            <p className={`${HintFormStyle} right-[100px] p-3`}>
                                Save palylist automatically at choosen time UTC.
                                Service need to play one of playlist songs to
                                get playlist context
                            </p>
                        )}
                        {FilterDislikesHint && (
                            <div
                                className={`${HintFormStyle} right-[-10px] p-3`}
                            >
                                <p>
                                    Checked: Play all songs from playlist to
                                    filter only playable ones
                                </p>
                                <p>
                                    Not checked: save DW playlist as is and
                                    don't use player
                                </p>
                            </div>
                        )}
                        {SaveFullPlHint && (
                            <div
                                className={`${HintFormStyle} right-[200px] p-3`}
                            >
                                <p>
                                    Checked: Save playlist even none of 30 songs
                                    were disliked
                                </p>
                                <p>
                                    Not checked: Consider such playlist as not
                                    listened thus don't save it'
                                </p>
                            </div>
                        )}
                    </div>
                    <input
                        className={`${TextFormStyle}`}
                        id="autosave-date-input"
                        type="datetime-local"
                    ></input>
                    <div className="flex justify-between">
                        <div>{SubmitMessage}</div>
                        <input
                            className={`${BaseButtonClass} bg-white h-10 focus:bg-blue-600`}
                            type="submit"
                            value="Submit"
                        />
                    </div>
                </form>
                <div className="flex flex-col gap-y-3">
                    <Button
                        style=""
                        title="Collect current DW"
                        link={undefined}
                        color="bg-white text-black w-40"
                    />
                    <Button
                        style=""
                        title="Play DW playlist"
                        link={undefined}
                        color="bg-white text-black w-36"
                    />
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;
