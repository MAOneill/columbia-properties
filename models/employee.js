//bring in the databases
const db = require('./conn');  //requre the conn.js file

//this will have all the fields as parameters
//static means all instance of the class have this function
class Employee {
    constructor (id, name, title, email, phone, description, department_id) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.email = email;
        this.phone = phone;
        this.description = description;
        this.deptId = department_id;   //this will link to department table
    }

static getAll() {
    return db.any(`SELECT * from employee`)
    .then((employeesSql) => {
        const employeeArray = [];
        employeesSql.forEach((emp) => {
            const oneEmp = new Employee(emp.id, emp.name, emp.title, emp.phone, emp.description, emp.deptId);
            employeeArray.push(oneEmp);
        })
        return employeeArray;
    })
    .catch((error) => {
        console.log(error);
    });
}



//this pulls the record out of sql and returns it as a js object
static getById(id) {
    return db.one(`SELECT * employee where id = $1`,[id])
        .then((employee) => {
            const employeeInstance = new Employee(employee.id, employee.name, employee.title, employee.email, employee.phone, employee.description, employee.department_id);
            return employeeInstance
        })
        .catch((error) => {
            console.log(error);
        });
}


    //no 'static' since this is an instance method.  it belongs to the instance, not the class
    update() {
        return db.result(`UPDATE employee SET 
            name = $1, title = $2, email = $3, phone = $4, description = $5, department_id = $6
            where id = $7`, [this.name, this.title, this.email, this.phone, this. description, this.deptId, this.id]);
    }

    addNew() {
        return db.result(`INSERT into employee (name, title, email, phone, description, department_id)
        values
        ($1, $2, $3, $4, $5, $6)`,[this.name, this.title, this.email, this.phone, this. description, this.deptId]);

        //after an add return them to the list of employees
    }
};
module.exports = Employee;
