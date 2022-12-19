function ContainerContent() {
  return (
  <div className="ContainerLogo"><span>facebook</span></div>

  )
}

function ContainerIcons(){
  return (
    <div className="ContainerEventIcons">
      <div><i class="fa-solid fa-bell"></i></div>
      <div>LO</div>

      
      </div>

  )
}




function Container() {
  return (
    <div className="Container">
      <ContainerContent />
      <ContainerIcons />
    </div>
  );
}

export default Container;
