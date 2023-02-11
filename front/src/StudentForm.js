import { Button, CardTitle, Form, FormGroup, Input, Label, Card, CardBody, CardFooter } from 'reactstrap';
import './App.css';

const StudentForm = ({isUpdate, toggle, student, handleChange, handleSubmit}) => {
    return (
        <Card>
            <CardTitle className="cardheader" >
                <div className="containerheader">
                    <div >
                        <h3>Add new student</h3>
                    </div>
                </div>
            </CardTitle>
            <Form id="CreateUserform">

                <CardBody>
                    <FormGroup>
                        <Label for="name">Student Name</Label>
                        <Input type="text" name="name" id="name" value={student.name}
                            onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="name">Student Email</Label>
                        <Input type="email" name="email" id="email" value={student.email}
                            onChange={handleChange} />
                    </FormGroup>
                </CardBody>
                <CardFooter>
                    <FormGroup style={{ float: "right" }}>
                        <Button color="primary" onClick={handleSubmit}>{isUpdate? "Save": "Add"}</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </FormGroup>

                </CardFooter>
            </Form>
        </Card>
    );
}

export default StudentForm;