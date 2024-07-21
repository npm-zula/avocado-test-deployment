import {rewardLinks} from "@/constants";


const Rewards = () => {
    return <div className="flex flex-1">
        <div className="home-container">
            <div className="home-posts">
                <h2 className="h3-bold md:h2-bold text-left w-full">Rewards</h2>

                <ul className="grid 2xl:grid-cols-3 grid-cols-2 gap-6">
                    {rewardLinks.map(link => {
                       return <li key={link.operator}>
                           <a className="card" href={link.url}>
                               <div className="h3-bold">{link.operator}</div>
                               <img className="h-full w-full rounded-xl object-cover" src={link.imageUrl}/>
                           </a>
                       </li>
                    })}
                </ul>
            </div>
        </div>
    </div>
}

export default Rewards;

