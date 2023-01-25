// recursive component
import { findFile } from "../../utils/mutateTree";
import { useTreeSelector } from "../../hooks/store/treeStore";

const Tree:React.FC<{start:string, tree:any}> = ({start, tree}) => {
    
    const children = tree.next;
    const fullState = useTreeSelector(state=>state.tree);

    return (
        <ul className={start === "/" ? "tree": undefined}>
            <li>
                <span className={
                    tree.link ? "linked" : undefined
                    // tree.type === "directory" ? "directory": "file"
                    }>
                    {start}
                    {tree.hide ? "(hide)": null}
                </span>
                <ul>
                {tree.link ? 
                    <li>
                        <Tree start={tree.link.slice(-1)} tree={findFile(tree.link, JSON.stringify(fullState))}/> 
                    </li>
                : null}
                {children? 
                    Object.keys(children).map(k =>{
                        if (typeof children[k] === 'object'){
                            return (
                                <li key={(Date.now()+Math.random()).toString()}>
                                    <Tree start={k} tree={children[k]}/>
                                </li>
                            )
                        }
                    })
                : <></>} 
                </ul>
            </li>
        </ul>
    )
}

export default Tree;