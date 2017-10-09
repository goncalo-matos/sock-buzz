import * as React from 'react';

interface IPlayer {
    name: string;
}

interface IPlayerResult {
    player: IPlayer;
    time: Date;
}

interface IPlayerResultListProps {
    players: IPlayerResult[];
}

class PlayerResultList extends React.Component<IPlayerResultListProps, any> {

    public render() {
        const listItems = this.props.players
            .sort((playerResultA, playerResultB) => playerResultB.time.getTime() - playerResultA.time.getTime())
            .map((playerResult) => <li key={playerResult.player.name}>
                {playerResult.player.name}{playerResult.time.toDateString()}
            </li>);

        return <ul>
            {listItems}
        </ul>;
    }
}

export {
    PlayerResultList,
    IPlayerResult,
};
