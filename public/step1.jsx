var Note = React.createClass({
    getInitialState: function () {
        return {
            eidting: false
        }
    },
    edit: function () {
        this.setState({
            eidting: true
        })
    },
    save: function () {
        // var val = this.refs.newText.value;
        this.props.onChange(this.refs.newText.value,this.props.index);
        this.setState({
            eidting: false
        })
    },
    remove: function () {
    this.props.onRemove(this.props.index);
    },
    renderDisplay: function () {
        return (
            <div className="list-group-item display">
                <p className = "lead">{this.props.children}</p>
                <span>

                    <button className="btn btn-primary glyphicon glyphicon-pencil" onClick={this.edit}></button>
                    <button className="btn btn-danger" onClick={this.remove}>RM</button>
                </span>
            </div>
        )
    },
    renderForm: function () {
        return (
            <div className="note list-group-item">
                <textarea className="form-control" defaultValue={this.props.children} ref = "newText"></textarea>
                <button className="btn btn-success" onClick={this.save}>save</button>
            </div>
        )
    },
    render: function () {
        if (this.state.eidting) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
})
var Board = React.createClass({
    propTypes: {

        count: function (props, propName) {
            if (typeof props[propName] !== "number") {
                return new Error("must be number");
            }
            if (props[propName] > 100) {
                return new Error("No greater than 100");
            }
        }
    },
    getInitialState: function () {
        return {
            note: [
                "ask",
                "getFullName",
                "Makkah",
                "Medinah"
            ]
        }
    },
    update: function (newText, i) {
        var arr = this.state.note;
        arr[i] = newText;
        this.setState({note:arr})
    },
    remove:function(i){
        var arr = this.state.note;
        arr.splice(i,1);
        this.setState({note:arr});
    },
    eachNote:function(note,i){
     return (
         <Note key = {i} index = {i} onChange = {this.update} onRemove = {this.remove}>{note}</Note>
     )
    },

    render: function () {
        return (
            <div className = "col-md-6 col-md-offset-3 list-group">
                {this.state.note.map(this.eachNote)}
            </div>
        )
    }
})
ReactDOM.render(<Board ></Board>, document.getElementById("app"));