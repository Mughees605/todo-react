var Note = React.createClass({
    getInitialState: function () {
        return {
            editing: false
        }
    },

    edit: function () {
        this.setState({
            editing: true
        })
    },
    remove: function () {
        this.props.onRemove(this.props.index);
    },

    save: function () {
       // this.props.onChange(this.refs.newText.value,this.props.index);
       var val = this.refs.newText.value;
        this.props.onChange(val,this.props.index);
        this.setState({
            editing: false
        })
        
    },

    renderForm: function () {
        return (
            <div className="note">
                <input type="text" className="form-control" ref = "newText" defaultValue = {this.props.children}/>
                <button className="btn btn-success" onClick={this.save}>SV</button>
            </div>
        )
    },


    renderDisplay: function () {
        return (
            <div className="note">
                <p>{this.props.children}</p>
                <span>
                    <button className="btn btn-primary" onClick={this.edit}>ED</button>
                    <button className="btn btn-primary" onClick={this.remove}>RM</button>
                </span>
            </div>
        )
    },
    render: function () {
        if (this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
}); //Note component end and it is a child of the Board element

var Board = React.createClass({
    getInitialState: function () {
        return {
            notes: [
            ]
        }
    },
    removeHandle: function (i) {
        var arr = this.state.notes;
        arr.splice(i, 1);
        this.setState({
            notes: arr
        })
    },
    saveHandle:function(newTxt,i){
        var arr = this.state.notes;
        arr[i] = newTxt;
        this.setState({notes:arr})
    },
    eachNote: function (note, i) {
        return (
            <Note key={i} onRemove={this.removeHandle} onChange = {this.saveHandle} index={i} >{note}</Note>
        )
    },
    add:function(text){
    var arr = this.state.notes;
    arr.push(text);
    this.setState({
        notes:arr
    })
    },
    render: function () {
        return (
            <div className="board">
                {this.state.notes.map(this.eachNote)}
                <button className = "btn btn-success" onClick = {this.add.bind(null, "New Note")}>+</button>
            </div>
        )
    }
})

ReactDOM.render(<Board></Board>, document.getElementById("app"));
