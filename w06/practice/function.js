// The code below iwll be excuted every time a function is called

function getName(){
    return "John";
}

const getMyName = () => {
    return "Rena Domon"
}


const name = getName()
const name2 = getName()
const name3 = getMyName()

const articles = [
    {
        "title": "hello",
        test: "test"
    }
]


function getBookTemplate(book){
    return `
    <div>
        ${book.title}
    </div>
    `
}

getBookTemplate(articles[0])

const obj = {
    name:'test',
    getName:() => "Rena Domon"
}

obj.getName()