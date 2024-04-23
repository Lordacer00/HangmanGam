import Welcome from './componentes/Welcome';
import Hangman from './componentes/Hangman';

const food = ['apple','banana','cherry','date','fig','grape','kiwi'];
const computers = ['computer', 'keyboard', 'mouse', 'software', 'internet', 'email', 'website'];
const mexicanFood = ['taco', 'burrito', 'enchilada', 'guacamole', 'quesadilla', 'salsa', 'tortilla'];

function App(){
return(
    <div className='App' >
        <Welcome />
        <Hangman food={food} computers={computers} mexicanFood={mexicanFood}/>
    </div>
);
}

export default App;