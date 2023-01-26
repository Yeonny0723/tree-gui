import { useTreeSelector } from '../hooks/store/treeStore';
import Tree from '../components/Tree/Tree';
import Terminal from '../components/Terminal/Terminal';
import { ContainerStyle, TreeStyle } from '../styles/Home.styles';

const Home: React.FC = () => {
   const { tree } = useTreeSelector(state => state);

   return (
      <ContainerStyle>
         <h1>Tree GUI</h1>
         <TreeStyle>
            <Terminal tree={tree} />
            <Tree start="/" tree={tree['/']} linked={false} />
         </TreeStyle>
      </ContainerStyle>
   );
};

export default Home;
