// recursive component
import classNames from "classnames";
import { findFile } from "../../utils/mutateTree";
import { useTreeSelector } from "../../hooks/store/treeStore";

const Tree:React.FC<{start:string, tree:any, linked: boolean}> = ({start, tree, linked=false}) => {

    const children = tree.next;
    const fullState = useTreeSelector(state=>state.tree);
    
    const _link  = tree.link ? true: false; // tree.link를 보유한 상위 폴더의 직속 하위 폴더 linked 프로퍼티 설정을 위한 변수

    return (
        <ul className={start === "/" ? "tree": undefined}>
            <li>
                <span className={classNames(
                    tree.type === "directory" ? "directory": "file",
                    linked ? "linked" : undefined
                    )}>
                    {start}
                    {tree.hide ? "(hide)": null}
                </span>
                <ul>
                {tree.link ? 
                    <li>
                        <Tree linked={_link} start={tree.link.slice(-1)} tree={findFile(tree.link, JSON.stringify(fullState))}/> 
                    </li>
                : null}
                {children? 
                    Object.keys(children).map(k =>{
                        if (typeof children[k] === 'object'){
                            return (
                                <li key={(Date.now()+Math.random()).toString()}>
                                    <Tree linked={false} start={k} tree={children[k]}/>
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