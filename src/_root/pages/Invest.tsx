import {brokerageLinks} from "@/constants";


const Invest = () => {
    return <div className="flex flex-1">
        <div className="home-container">
            <div className="home-posts">
                <h2 className="h3-bold md:h2-bold text-left w-full">Invest</h2>

                <ul className="grid 2xl:grid-cols-3 grid-cols-2 gap-6">
                    {brokerageLinks.map(link => {
                        return <li key={link.brokerage}>
                            <a className="card" href={link.url}>
                                <div className="h3-bold">{link.brokerage}</div>
                                <img className="h-full w-full rounded-xl object-cover" src={link.imageUrl}/>
                            </a>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </div>
}

export default Invest;

