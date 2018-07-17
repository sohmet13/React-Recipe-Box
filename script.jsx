class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      names: JSON.parse(localStorage.getItem('_sohmet13_recipes_names')) || ['Garlic Chicken', 'Easy Chocolate Pie', 'Lime Chicken Tacos', 'Artichoke Pasta', 'Artichoke Dip'],
      ingredients: JSON.parse(localStorage.getItem('_sohmet13_recipes_ingredients')) || 
      {'Garlic Chicken': '3 tablespoons butter \\ 1 teaspoon seasoning salt \\ 1 teaspoon onion powder  \\ 4 skinless, boneless chicken breast halves \\ 2 teaspoons garlic powder', 
       'Easy Chocolate Pie': '1 (12 ounce) can evaporated milk \\ 1 (5.9 ounce) package chocolate instant pudding mix \\ 1 (6.5 ounce) can whipped cream \\ 1/2 cup miniature semi-sweet chocolate chips (optional) \\ 1 (9 inch) graham cracker pie crust \\ Another can of whipped cream for garnish (optional)',
       'Lime Chicken Tacos': '1 1/2 pounds skinless, boneless chicken breast meat - cubed \\ 1/8 cup red wine vinegar \\ 1/2 lime, juiced \\ 1 teaspoon white sugar \\ 1/2 teaspoon salt \\ 1/2 teaspoon ground black pepper \\ 2 green onions, chopped \ 2 cloves garlic, minced \\ 1 teaspoon dried oregano \\ 10 (6 inch) corn tortillas \\ 1 tomato, diced \\ 1/4 cup shredded lettuce \\ 1/4 cup shredded Monterey Jack cheese \\ 1/4 cup salsa', 
       'Artichoke Pasta': '2 tablespoons butter \\ 2 cloves garlic, minced \\ 1 cup heavy cream \\ 3/4 teaspoon salt \\ 1 teaspoon fresh-ground black pepper \\ 2 1/2 cups canned, drained artichoke hearts (two 14-ounce cans), rinsed and cut into halves or quarters \\ 3/4 pound fusilli \\ 1/2 cup grated Parmesan cheese \\ 2 tablespoons chopped chives, scallion tops, or parsley', 
       'Artichoke Dip': '1 8oz package soft cream cheese \\ 4oz mayonnaise \\ 4oz sour cream \\ 1/4 Cup Fresh Grated Parmesan Cheese \\ 1/4 Cup Fresh Grated Romano Cheese \\ 2 eggs \\ 3/4 Cup dairy sour cream \\ 1 16oz can artichoke hearts \\ 1/4 Cup fresh chopped chives \\ 1 tbs fresh minced garlic'},
      directions: JSON.parse(localStorage.getItem('_sohmet13_recipes_directions')) ||  {
        'Garlic Chicken': 'Melt butter in a large skillet over medium high heat. \\ Add chicken and sprinkle with garlic powder, seasoning salt and onion powder.', 
        'Easy Chocolate Pie': 'Pour milk into medium bowl. Add dry pudding mix; beat with wire whisk until well blended and mixture just begins to thicken. Stir in half of the chocolate chips. \\ Add contents of whipped cream can; stir gently but quickly until well blended. Pour into crust; cover. \\ Refrigerate 6 hours, or until set. Cut into 8 slices to serve. Garnish with additional whipped cream and remaining chocolate chips, if desired.', 
        'Lime Chicken Tacos': 'Saute chicken in a medium saucepan over medium high heat for about 20 minutes. Add vinegar, lime juice, sugar, salt, pepper, green onion, garlic and oregano. Simmer for an extra 10 minutes. \\ Heat an iron skillet over medium heat. Place a tortilla in the pan, warm, and turn over to heat the other side. Repeat with remaining tortillas. Serve lime chicken mixture in warm tortillas topped with tomato, lettuce, cheese and salsa.', 
        'Artichoke Pasta': 'In a medium saucepan, melt the butter over moderately low heat. Add the garlic and cook for 30 seconds. Stir in the cream, salt, pepper, and artichoke hearts. Cook until just heated through, about 3 minutes. \\ In a large pot of boiling, salted water, cook the fusilli until just done, about 13 minutes. Drain the pasta and toss with the cream sauce, Parmesan, and chives.', 
        'Artichoke Dip': 'Soften the cream cheese before mixing. \\ Rinse well, then dice the artichokes into small ½” size pieces. \\ Into a mixing bowl place the softened cream cheese. Mix in the mayonnaise, sour cream, the Parmesan and Romano cheese, artichokes and garlic. \\ Then the mixture is fairly well blended, spoon into a 9” round glass pie dish. \\ Set Oven to Bake at 350 degrees. \\ Place un-covered dish into oven for 20 – 25 minutes until the edges appear slightly golden and mixture is bubbling at the edge. \\ Remove and sprinkle chopped chives on top and let cool about 5 minutes before serving. \\ Enjoy!' },
      checkAdd: false,
      checkEdit: false,
      //текущий рецепт
      currentRec: ''
    }
    this.Add = this.Add.bind(this);
    this.Close = this.Close.bind(this);
    this.Edit = this.Edit.bind(this);
    this.CurrentRec = this.CurrentRec.bind(this);
    this.Del = this.Del.bind(this);
    this.PressAdd = this.PressAdd.bind(this);
    this.PressEdit = this.PressEdit.bind(this);
  }
  CurrentRec(event) {
    this.setState({
      currentRec: event.target.innerText,
    }) 
  }
  PressAdd() {
    this.setState({
      checkAdd: true
    })
  }
  PressEdit() {
    this.setState({
      checkEdit: true
    })
    if(!this.state.currentRec){
      this.setState({
        currentRec: this.state.names[0]
      })
    }
  }
  Add() {
    let name = document.getElementById('recname').value;
    let ing = document.getElementById('ing').value;
    let dir = document.getElementById('dir').value;
    if (name && ing && dir){
      if (this.state.names.indexOf(name)===-1) {
        this.state.names.push(name);
        this.state.ingredients[name] = ing;
        this.state.directions[name] = dir;
        localStorage.setItem('_sohmet13_recipes_names', JSON.stringify(this.state.names));
        localStorage.setItem('_sohmet13_recipes_ingredients', JSON.stringify(this.state.ingredients));
        localStorage.setItem('_sohmet13_recipes_directions', JSON.stringify(this.state.directions));   
        this.Close();
      } else {
        alert(`${name} has already been added to the Recipe Box!`);
      }
    }
  }
  Edit() {
    let name = document.getElementById('recname').value;
    let ing = document.getElementById('ing').value;
    let dir = document.getElementById('dir').value;
    let num = this.state.names.indexOf(this.state.currentRec);
    if(this.state.names.indexOf(name)>-1 && this.state.currentRec!==name) {
      alert(`${name} has already been added to the Recipe Box!`)
    } else {
      this.state.names.splice(num, 1, name);
      this.state.ingredients[name] = ing;
      this.state.directions[name] = dir;
      this.setState({
        currentRec: name
      })
      localStorage.setItem('_sohmet13_recipes_names', JSON.stringify(this.state.names));
      localStorage.setItem('_sohmet13_recipes_ingredients', JSON.stringify(this.state.ingredients));
      localStorage.setItem('_sohmet13_recipes_directions', JSON.stringify(this.state.directions));
      this.Close();
    }
  }
  Close() {
    this.setState({
      checkAdd: false,
      checkEdit: false
    });
  }
  Del(e){
    if (this.state.names.length>1) {
      let del = this.state.currentRec;
      let num = (this.state.names.indexOf(del)===-1) ? 0: this.state.names.indexOf(del);
      this.setState({
        currentRec: this.state.names[num+1] || this.state.names[num-1],
      });
      this.state.names.splice(num, 1)
      localStorage.setItem('_sohmet13_recipes_names', JSON.stringify(this.state.names));
      localStorage.setItem('_sohmet13_recipes_ingredients', JSON.stringify(this.state.ingredients));
      localStorage.setItem('_sohmet13_recipes_directions', JSON.stringify(this.state.directions));
    } else {
      alert('Recipe Box should have at least one recipe in it!')
    }
  }
  render () {
    return (
      <main>
        <h1 onClick={()=> localStorage.clear()} title='Clear local storage'>Recipe Box</h1>
        <List current={this.CurrentRec} name={this.state.currentRec || this.state.names[0]} names={this.state.names} />  
        <section id='box'>
          <Head name={this.state.currentRec || this.state.names[0]} del={this.Del} edit={this.PressEdit}/>
          <Body ing={this.state.ingredients} dir={this.state.directions} name={this.state.currentRec || this.state.names[0]}/>
          <Bottom add={this.PressAdd}/>
        </section>
        {(this.state.checkAdd || this.state.checkEdit) && <AddEdit checkEdit={this.state.checkEdit} checkAdd={this.state.checkAdd} add={this.Add} edit={this.Edit} close={this.Close} ing={this.state.ingredients} dir={this.state.directions}/>}
        {(this.state.checkAdd || this.state.checkEdit) && <Shade />}
      </main>
    );
  }
}
class List extends React.Component {
  constructor(props) {
    super(props);
    this.isActive = this.isActive.bind(this);
  }
  isActive(value) {
    return ((value.a===this.props.name) ?'active':'');
  } 
  render() {
    let name = this.props.names.map(a => <li className={this.isActive({a})} onClick={this.props.current} >{a}</li>);
    return (
          <ul id='names'>
            {name}
          </ul>
    )
  }
}
class Head extends React.Component {
  render() {
    return(
    <div id='head'>
      <p id='name'>{this.props.name}</p>
      <i title='Delete recipe' className='fa fa-trash' aria-hidden="true" onClick={this.props.del} ></i>
      <i title='Edit recipe' className='fa fa-edit' aria-hidden="true" onClick={this.props.edit}></i>
    </div>
        )
  }
}
class Body extends React.Component {
  render() {
    let ing = this.props.ing[this.props.name].split('\\').map(a => <li>{a.trim()}</li>);
    let dir = this.props.dir[this.props.name].split('\\').map(b => <li>{b.trim()}</li>);
    return (
        <div id='body'>
          <p>Ingredients:</p>
          <ul>{ing}</ul>
          <p>Directions:</p>
          <ul className='dir'>{dir}</ul>
        </div>
    )
  }
}
class Bottom extends React.Component {
  render() {
    return (
      <div id='bottom'>
        <i title='Add recipe' className='fa fa-plus-square-o' aria-hidden="true" onClick={this.props.add}/>
     </div>
    )
  }
}
class AddEdit extends React.Component {
  render() {
    return (
      <section className='add'>
       <h2>{(this.props.checkAdd && 'Add a recipe') || 'Edit a recipe'}</h2>
        <i className='fa fa-close' onClick={this.props.close}/>
        <form id='add-form'>
        <h3>Recipe</h3>
        <textarea rows="1" placeholder='Recipe name' id='recname'>{(this.props.checkEdit && document.getElementById('name').innerText) || ''}</textarea>
        <h3>Ingridients</h3>
        <textarea rows="4" placeholder={'Separate each ingredient with a "\\":\n\nMilk \\ 2 Eggs \\ 1/3 Cup Sugar'} id='ing'>{(this.props.checkEdit && this.props.ing[document.getElementById('name').innerText]) || ''}</textarea>
        <h3>Directions</h3>
        <textarea rows="7" placeholder={'Separate each ingredient with a "\\":\n\nPreheat oven to 350°F \\ \nCombine ingrediens in pie crust \\\nBake until crust is golden brown. \\'} id='dir'>{(this.props.checkEdit && this.props.dir[document.getElementById('name').innerText]) || ''}</textarea>
        <div className='button' onClick={(this.props.checkAdd && this.props.add) || this.props.edit}><p>{(this.props.checkAdd && 'Add') || 'Edit'}</p></div>
        </form>
      </section>
    )
  }
}
class Shade extends React.Component {
  render() {
    return (<div id='shade'></div>)
  }
}
  
ReactDOM.render(<App/>, document.getElementById("app"));
