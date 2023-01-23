

const Tree:React.FC<any> = ({tree}) => {
    return (
        <ul style={{ paddingLeft: 10 }}>
            <span>{tree.name}</span>
            {tree.hide ? 
                <small>[hide]</small>
             : null
            }
            {tree.next?.map((branch:any) => {
                return (
                    <li style={{ paddingLeft: 10 }}>
                        <Tree tree={branch} />
                    </li>
                );
            })}
        </ul>
    )
}

export default Tree;