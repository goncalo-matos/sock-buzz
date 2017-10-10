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
        const listItems = Array.from(this.props.players)
            .sort(([, playerResultA], [, playerResultB]) => playerResultB.time.getTime() - playerResultA.time.getTime())
            .map(([key, playerResult]) => <li key={key}>
                {playerResult.player.name}{playerResult.time.toDateString()}
            </li>);

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
