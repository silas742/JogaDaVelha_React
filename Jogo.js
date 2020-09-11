class Jogo extends React.Component {
  render() {
    return (
      <div className="game">
               {" "}
        <div className="game-board">
                    <Tabuleiro />       {" "}
        </div>
               {" "}
        <div className="game-info">
                    <span className="game-history">Movimentos</span>         {" "}
          <ol>          </ol>       {" "}
        </div>
             {" "}
      </div>
    );
  }
}
class Tabuleiro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quadrados: Array(9).fill(null),

      xIsNext: true
    };
  }
    handleNewGame() {
      this.setState({ quadrados: [] });
  }
  
  handleRandomGame() {
    const quadrados = this.state.quadrados.slice();
    if (calculateWinner(quadrados)) {
      alert("Jogo já acabou");
      return;
    }
  
  render() {
    const vencedor = calculateWinner(this.state.quadrados);
    
    const status = vencedor? ('Vencedor:'+vencedor): ('Jogador:'+ (this.state.xIsNext?'X':'O'));

    return (
      <div>
                <div>{status}</div>       {" "}
        <div className="board-row">
                    {this.renderizarQuadrado(0)}         {" "}
          {this.renderizarQuadrado(1)}          {this.renderizarQuadrado(2)}   
             {" "}
        </div>
               {" "}
        <div className="board-row">
                    {this.renderizarQuadrado(3)}         {" "}
          {this.renderizarQuadrado(4)}          {this.renderizarQuadrado(5)}   
             {" "}
        </div>
               {" "}
        <div className="board-row">
                    {this.renderizarQuadrado(6)}         {" "}
          {this.renderizarQuadrado(7)}          {this.renderizarQuadrado(8)}   
             {" "}
        </div>
             {" "}
      </div>
      <button className="btn" onClick={() => this.handleNewGame()}>
          Reniciar jogo
        </button>
      <button className="btn" onClick={() => this.handleRandomGame()}>
          Jogada aleatoria
        </button>
      </div>
    );
  }

  renderizarQuadrado(i) {
    return (
      <Quadrado
        value={this.state.quadrados[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    const quadrados = this.state.quadrados.slice();

    if(calculateWinner (quadrados)){
      alert('Jogo já acabou man');  
    }
    if(quadrados[i]){
      alert('Quadrado ocupado')
    }
    quadrados[i] = this.state.xIsNext ? "X" : "O";

    this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext });
  }
}

class Quadrado extends React.Component {
  /*constructor (props){

    super (props);

    this.state = {

      value: null

    }

  }*/

  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
                {this.props.value}     {" "}
      </button>
    );
  }
}
/*function Quadrado(props) {

  return (

    <button className="square" onClick={props.onClick}>

      {props.value}

    </button>

  );

}*/ function calculateWinner(
  quadrados
) {
  const lines = [
    [0, 1, 2],

    [3, 4, 5],

    [6, 7, 8],

    [0, 3, 6],

    [1, 4, 7],

    [2, 5, 8],

    [0, 4, 8],

    [2, 4, 6]
  ];
    for (let i =0; i<lines.length;i++){
      const [a,b,c]=lines[i];
      if(quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) return quadrados[a];
    }
}
ReactDOM.render(
  <Jogo />,

  document.getElementById("root")
); /*ReactDOM.render(

  <Tabuleiro quadrados={Array(9).fill().map((v, pos) => pos)} />,

  document.getElementById("root")  

);*/ /*ReactDOM.render(

  <Quadrado onClick={() => alert("Clicou!")} value={2 + 2} />,

  document.getElementById("root")

);*/
