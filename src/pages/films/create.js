import React from "react";


import axios from 'axios';
import { MyDropzone } from "./dropzone";
import { logOut } from '../auth/session';
class Create extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', slugName: '', description: '', rating: 1, date: (new Date()).toISOString().substr(0, 10), releaseDate: (new Date()).toISOString().substr(0, 10), files: [] };

        this.handleName = this.handleName.bind(this);
        this.handleSlugName = this.handleSlugName.bind(this);
        this.handleDescription = this.handleDescription.bind(this);

        this.handleDate = this.handleDate.bind(this);
        this.handleReleaseDate = this.handleReleaseDate.bind(this);

        this.handleRating = this.handleRating.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getImage = this.getImage.bind(this);

    }
    async getImage(file) {
        await this.setState({
            files: file.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        });
        console.log("here", this.state.files);
    }

    handleName(event) {
        this.setState({ name: event.target.value });
    }
    handleSlugName(event) {
        this.setState({ slugName: event.target.value });
    }
    handleDescription(event) {
        this.setState({ description: event.target.value });
    }
    handleDate(event) {
        this.setState({ date: event.target.value });
    }

    handleReleaseDate(event) {
        this.setState({ releaseDate: event.target.value });
    }

    handleRating(event) {
        this.setState({ rating: event.target.value });
    }


    handleSubmit(event) {
        const data = new FormData();
        data.append('name', this.state.name)
        data.append('slug_name', this.state.slugName)
        data.append('description', this.state.description)

        data.append('date', this.state.date)
        data.append('release', this.state.releaseDate)



        data.append('rating', this.state.rating)

        this.state.files.forEach(file => {
            data.append('myimages[]', file, file.name);
        });

        event.preventDefault();
        axios.post('http://127.0.0.1:8000/api/movieSubmit', data, {
            headers: { "Content-Type": "multipart/form-data", ctype: 'multipart/form-data' }
        })
            .then(function (response) {
                if (response.status != 200) {
                    logOut();
                }
                alert(response.request.response);
            })
            .catch(function (error) {
                console.log(error);
            });

        this.setState({
            name: '',
            slugName: '',
            description: '',
            files: [],
            rating: 1,
            date: (new Date()).toISOString().substr(0, 10),
            releaseDate: (new Date()).toISOString().substr(0, 10)

        })


    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <form className="theme-form mega-form" onSubmit={this.handleSubmit} ctype='multipart/form-data'>
                        <div className="card">
                            <div className="card-header">
                                <h5>Create Movie</h5>
                            </div>
                            <div className="card-body">


                                <div className="form-group ">
                                    <label className="col-form-label">Name</label>
                                    < input className="form-control" type="text" value={this.state.name} onChange={this.handleName} required />
                                </div>
                                <div className="form-group ">
                                    <label className="col-form-label">Slug Name</label>
                                    < input className="form-control" type="text" value={this.state.slugName} onChange={this.handleSlugName} required />
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">Description</label>
                                    < input className="form-control" type="text" value={this.state.description} onChange={this.handleDescription} required />
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">Date</label>
                                    <input className="form-control" type="date" placeholder="Enter date" onChange={this.handleDate} value={this.state.date} />
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">Release Date</label>
                                    <input className="form-control" type="date" placeholder="Enter relase date" onChange={this.handleReleaseDate} value={this.state.releaseDate} />
                                </div>

                                <hr className="mt-4 mb-4" />

                                <div className="form-group">
                                    <label className="col-form-label">Rating</label>
                                    <input className="form-control" type="number" step="1" value={this.state.rating} onChange={this.handleRating} min="1" max="5" placeholder="Insert Rating " />
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">Photo</label>
                                    <MyDropzone files={this.state.files} getImage={this.getImage}></MyDropzone>

                                </div>

                                <hr className="mt-4 mb-4" />
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary mr-1">Submit</button>

                            </div>
                        </div>
                    </form>
                </div>

            </div >
            // <form onSubmit={this.handleSubmit} className="form-inline theme-form mt-3 billing-form">
            //     <div className="container">
            //         <div className="row">

            //             <div className="col-12">
            //                 <label className="form-control"> Name: </label>
            //                 < input className="form-control" type="text" value={this.state.name} onChange={this.handleName} />

            //             </div>

            //             <div className="col-12">
            //                 <label className="form-control"> description: </label>
            //                 < input className="form-control" type="text" value={this.state.description} onChange={this.handleDescription} />

            //             </div>
            //             <div className="col-12">

            //                 <input className="form-control" type="submit" value="Submit" />

            //             </div>
            //         </div>

            //     </div>
            // </form >

        );
    }
}

export { Create };
