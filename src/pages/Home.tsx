import Tree from "../components/Tree/Tree";
import Terminal from "../components/Terminal/Terminal";
import { useTreeSelector } from '../hooks/store/treeStore'


const Home: React.FC = () => {
    
    const {tree} = useTreeSelector(state=>state);
    
    return (
    <>
        <Terminal tree={tree}/>
        <Tree start="/" tree={tree['/']}/>
    </>
    )
}

export default Home;