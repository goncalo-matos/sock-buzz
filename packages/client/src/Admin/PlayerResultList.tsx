import * as React from 'react';

interface IPlayer {
    name: string;
}

interface IPlayerResult {
    player: IPlayer;
    time: Date;
}

interface IPlayerResultListProps {
    players: Map<IPlayer['name'], IPlayerResult>;
}

class PlayerResultList extends React.Component<IPlayerResultListProps, any> {

    public render() {
        let firstTime: Date;
        const listItems = Array.from(this.props.players)
            .sort(([, playerResultA], [, playerResultB]) => playerResultA.time.getTime() - playerResultB.time.getTime())
            .map(([key, playerResult], index) => {
                let time;

                if (index === 0 ) {
                    firstTime = playerResult.time;
                    time = playerResult.time.toDateString();
                } else {
                    time = `+${playerResult.time.getTime() - time / 1000}s`;
                }

                return <li key={key}>
                    {playerResult.player.name}{time}
                </li>;
            });

        return <ul>
            {listItems}
        </ul>;
    }
}

export {
    PlayerResultList,
    IPlayerResultListProps,
    IPlayerResult,
};
