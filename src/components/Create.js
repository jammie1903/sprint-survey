import React, { Component } from 'react';
import { Modal, Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

class Create extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sprintNameChanged = this.sprintNameChanged.bind(this);

    this.state = {
      show: false,
      sprintName: '',
    };

    this.props.onSubmit("Test 1");
    this.props.onSubmit("Test 2");
    this.props.onSubmit("Test 3");
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleSubmit() {
    if (!this.state.allowSubmit) {
      return;
    }
    this.props.onSubmit(this.state.sprintName);
    this.handleClose();
  }

  sprintNameChanged(e) {
    this.setState({
      sprintName: e.target.value,
      allowSubmit: !!e.target.value
    });
  }

  render() {
    return (
      <div className="Create">
        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Create New Survey
        </Button>
        <form onSubmit={this.handleSubmit}>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Survey</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Sprint Name:</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.sprintName}
                  placeholder="Enter sprint name"
                  onChange={this.sprintNameChanged}
                />
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
              <Button bsStyle="primary" type="submit" disabled={!this.state.allowSubmit} onClick={this.handleSubmit}>Create</Button>
            </Modal.Footer>
          </Modal>
        </form>
      </div>

      // <div className="Create">
      //   <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#createModal">Create New Survey</button>
      //   <div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
      //     <div class="modal-dialog" role="document">
      //       <div class="modal-content">
      //         <div class="modal-header">
      //           <h5 class="modal-title" id="createModalLabel">New Survey</h5>
      //           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      //             <span aria-hidden="true">&times;</span>
      //           </button>
      //         </div>
      //         <div class="modal-body">
      //           <form>
      //             <div class="form-group">
      //               <label for="sprint-name" class="col-form-label">Sprint Name:</label>
      //               <input class="form-control" id="sprint-name" />
      //             </div>
      //           </form>
      //         </div>
      //         <div class="modal-footer">
      //           <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      //           <button type="button" class="btn btn-primary">Create</button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Create;
