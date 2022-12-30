import React, { FC } from 'react';
import { WeekCounter } from './WeekCounter';

interface IUserCard {
    userName: string;
    imgUrl: string;
    followers: number;
}

export const DefaultUserImage =
    'https://i.scdn.co/image/ab6775700000ee8549835514e2fac464191927c7';

const UserCard: FC<IUserCard> = ({ userName, imgUrl, followers }) => {
    return (
        <div className="flex p-5">
            <div className="mr-9">
                <img
                    src={imgUrl}
                    alt="User icon "
                    className="h-16 rounded-full"
                />
            </div>
            <div>
                <div className="p-0.5 flex ">
                    <div className="font-semibold text-white text-lg mr-6 leading-6 text-shadow-md">
                        {userName}
                    </div>
                    <div className="text-white text-base mt-[2px] leading-6 opacity-80 hidden xl:block text-shadow-md">
                        {followers > 999 ? followers / 1000 + 'k' : followers}{' '}
                        followers
                    </div>
                </div>
                <WeekCounter />
            </div>
        </div>
    );
};

export default UserCard;
