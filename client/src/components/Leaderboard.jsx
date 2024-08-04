import './styles/Leaderboard.css';

const Leaderboard = () => {
    return (
        <div className="board-container">
            <h2>Emory: Campus</h2>
            <ol className="leaderboard-list">

                <li className="leaderboard-item" style={{ fontSize: '25px'}}>
                    <span className="item-number">1.</span>
                    <span className="item-text">John Smith: 20 min</span>
                </li>

                <li className="leaderboard-item" style={{ fontSize: '20px'}}>
                    <span className="item-number">2.</span>
                    <span className="item-text">Mary Sue: 15 min</span>
                </li>

                <li className="leaderboard-item" style={{ fontSize: '15px', marginBottom: '0px'}}>
                    <span className="item-number">3.</span>
                    <span className="item-text">Shane Berhoff: 10 min</span>
                </li>
            </ol>
        </div>
    );
}

export default Leaderboard;
