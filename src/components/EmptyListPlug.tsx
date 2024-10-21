interface IEmptyListPlugProps {
    type: string
}

export default function EmptyListPlug({ type }: IEmptyListPlugProps) {
    return <div className="EmptyListPlug"><p>No {type} defined</p></div>;
}