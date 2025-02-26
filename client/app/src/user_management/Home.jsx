
import '../CSS/home.css';
const Home = () => {

    const handleButtonClick = () => {
        window.location.href = '/signin';
    };

    return (
        <>
            <div className="home">
            </div>
            <div className='homeinfo'>
                <h1>
                    <span>Learn</span>
                    <span> and</span>
                    <span> grow</span>
                    <span> with</span>
                    <span> the</span>
                    <span> help</span>
                    <span> of</span>
                    <span> world</span>
                    <span> class</span>
                    <span> mentors</span>
                </h1>
                <p>Start your transformation journey today with the help of teachers in your projects.</p>
                <button className="button" onClick={handleButtonClick}>Get Started</button>
            </div>
            </>
    );
}

export default Home;
