import * as React from 'react';

const tableStyle = require('./table.scss');

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
                    time = playerResult.time.toLocaleDateString('pt-PT', {hour: '2-digit', minute: '2-digit'});
                } else {
                    time = `+${(playerResult.time.getTime() - firstTime.getTime()) / 1000}s`;
                }

                return <tr key={key}>
                    <td>{playerResult.player.name}</td><td>{time}</td>
                </tr>;
            });

        return <table className={tableStyle.table}>
            <thead>
                <th>Player</th><th>Time</th>
            </thead>
            <tbody>
                {listItems}
            </tbody>
        </table>;
    }
}

export {
    PlayerResultList,
    IPlayerResultListProps,
    IPlayerResult,
};
