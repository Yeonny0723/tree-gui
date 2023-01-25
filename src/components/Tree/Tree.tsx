// recursive component
import classNames from "classnames";
import { findFile } from "../../utils/mutateTree";
import { useTreeSelector } from "../../hooks/store/treeStore";

const Tree:React.FC<{start:string, tree:any, linked:boolean}> = ({start, tree, linked=false}) => {

    const children = tree.next;
    const fullState = useTreeSelector(state=>state.tree);
    
    const _linked = tree.link ? true : false; // tree.link를 가진 부모의 직속 트리 구분 용도

    return (
        <ul className={start === "/" ? "tree": undefined}>
            {tree.link ? 
                <li>
                    <Tree linked={_linked} start={tree.link.slice(-1)} tree={findFile(tree.link, JSON.stringify(fullState))}/> 
                </li>
            : 
                <li>
                    <span className={classNames(
                        tree.type === "directory" ? "directory": "file",
                        linked ? "linked" : undefined
                        )}>
                        {start}
                        {tree.hide ? "(hide)": null}
                    </span>
                    <ul>
                    {children ? 
                        Object.keys(children).map(k =>{
                            if (typeof children[k] === 'object'){
                                return (
                                    <li key={(Date.now()+Math.random()).toString()}>
                                        <Tree linked={false} start={k} tree={children[k]}/>
                                    </li>
                                )
                            }
                        })
                    : null} 
                    </ul>
                </li>
            }
        </ul>
    )
}

export default Tree;