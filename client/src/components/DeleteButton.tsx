interface IDeleteProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
}
function DeleteButton(props: IDeleteProps) {
  return <button className="destroy" onClick={props.onClick}/>;
}

export default DeleteButton;
