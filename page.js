!function () {
    'use strict';

    var {Actions} = window;

    window.Page = ReactRedux.connect(state => {
        var {todos} = state;

        return {todos};
    })(React.createClass({
        getInitialState: function () {
            return {
                // If "editingIndex" is a number, then will show edit dialog box
                editingIndex: null,

                // "newTodo" is the todo text editing (not committed yet)
                newTodo: null,

                saving: 0
            };
        },
        componentWillReceiveProps: function (nextProps) {
            // If we are editing and the editing row is updated, we close the editing dialog

            var editingIndex = this.state.editingIndex;

            if (typeof editingIndex === 'number' && this.props.todos.get(editingIndex) !== nextProps.todos.get(editingIndex)) {
                this.setState({ editingIndex: null, saving: 0 });
            }
        },
        onTodoChange: function (evt) {
            this.setState({ newTodo: evt.target.value });
        },
        onSaveClick: function (evt) {
            evt.preventDefault();

            var {editingIndex, newTodo} = this.state;

            this.setState({ saving: 1 });
            this.props.dispatch(Actions.saveTodo(editingIndex, newTodo));
        },
        onCancelClick: function (evt) {
            evt.preventDefault();

            this.setState({ editingIndex: null, saving: 0 });
        },
        onEditClick: function (evt) {
            evt.preventDefault();

            var editingIndex = +evt.target.getAttribute('data-index');

            this.setState({
                editingIndex,
                newTodo: this.props.todos.get(editingIndex)
            });
        },
        render: function () {
            var {state} = this;

            return (
                <div>
                    <ul>
                        {
                            this.props.todos.map((todo, index) =>
                                <li key={index}>
                                    <span>{todo} [<a href="#" onClick={this.onEditClick} data-index={index}>Edit</a>]</span>
                                </li>
                            )
                        }
                    </ul>
                    {
                        typeof this.state.editingIndex === 'number' &&
                        <div className="curtain">
                            <div className="modal">
                                <h1>Edit</h1>
                                <input type="text"
                                       onChange={this.onTodoChange}
                                       value={state.newTodo} />
                                <div>
                                    <button disabled={state.saving} onClick={this.onSaveClick}>Save</button>
                                    <button onClick={this.onCancelClick}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            );
        }
    }));
}();