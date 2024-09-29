import './Home.css';
import homeImg1 from '../img/home_image.png';
import Item from './Item';


function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <h1 className="text-8xl font-bold tex-center">
          TakeMyJunk
        </h1>
        <br></br>
        <h2 className="text-lg font-bold tex-center text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-3 text-center dark:bg-blue-600 dark:focus:ring-blue-800">
          Sell your stuff without ever having to take them off campus!
        </h2>
        <br></br>
          <div className='btnWrapper border-8 border-blue-500'>   
            <a href="/Item" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Shop Items</a>
            <a className='labeling'>Moving In? Get second hand items for cheap right on campus!</a>
            <img src={homeImg1} className="homeImg" alt='locker' />
          </div>
          <br></br>
      </header>
    </div>
  );
}

export default Home;