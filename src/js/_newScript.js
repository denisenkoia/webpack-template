console.log('new Script 12345');

export default function() {
    console.log("test");
}

const Arr = {
    a: 'test',
    b: 'test'
};

const prom = () => {
    console.log( 'prom');
}
prom();
const Arr_2 = {...Arr};
console.log( "Arr_2", Arr_2 );