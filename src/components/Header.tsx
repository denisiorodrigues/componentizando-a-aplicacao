interface HeaderProp{
  title : string
}

export function Header(props:HeaderProp){
  return (
    <header>
      <span className="category">Categoria:<span> {props.title}</span></span>
    </header>
  );
}