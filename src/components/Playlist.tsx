import React, { FC } from 'react';
import SongCard from './SongCard';
import { emptySong, Song } from '../interfaces/Song';
import PlaylistTitle from './PlaylistTitle';

interface IPlayList {
    title: string;
    songs: string;
    isDW: boolean;
    style: string;
}

const Playlist: FC<IPlayList> = ({ title, songs, isDW, style }) => {
    return (
        <div className="max-w-md mb-3 flex flex-col gap-y-12">
            <PlaylistTitle title={'Playlist: ' + title} isDW={isDW} />
            <div className={`container overflow-y-scroll ${style} mt-3`}>
                {Array.isArray(songs) && songs.length ? (
                    songs.map((song: Song, index: number) => (
                        <SongCard
                            key={index.toString()}
                            song={song}
                            index={index.toString()}
                            isDeletable={false}
                            onDelete={undefined}
                            isHidden={undefined}
                        />
                    ))
                ) : (
                    <div className="opacity-50">
                        <SongCard
                            song={emptySong}
                            index={0}
                            isDeletable={false}
                            onDelete={undefined}
                            isHidden={undefined}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Playlist;
