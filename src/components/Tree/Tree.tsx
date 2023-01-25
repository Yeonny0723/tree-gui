// recursive component
import { findFile } from "../../utils/mutateTree";
import { useTreeSelector } from "../../hooks/store/treeStore";

const Tree:React.FC<{start:string, tree:any}> = ({start, tree}) => {
    
    const children = tree.next;
    const fullState = useTreeSelector(state=>state.tree);

    return (
        <ul style={{ paddingLeft: 10 }}>
            <span>{start}</span>
            {tree.hide ? <small>(hide)</small>: null}
            {tree.type ? <small>({tree.type})</small>: null}
            {tree.link ? <Tree start={tree.link.slice(-1)} tree={findFile(tree.link, JSON.stringify(fullState))}/> : null}
            {children? 
                Object.keys(children).map(k =>{
                    if (typeof children[k] === 'object'){
                        return (
                            <li key={(Date.now()+Math.random()).toString()} style={{ paddingLeft: 10 }}>
                                <Tree start={k} tree={children[k]}/>
                            </li>
                        )
                    }
                })
            : <></>} 
        </ul>
    )
}

export default Tree;