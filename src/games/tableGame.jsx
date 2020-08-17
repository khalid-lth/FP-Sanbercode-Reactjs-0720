import React, { Component } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import SideBar from "../layout/sidebar"
// import MovieSearch from "./MovieSearch";

class TableMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        axios.get(`https://backendexample.sanbersy.com/api/games`).then((res) => {
            let data = res.data.map((el) => {
                return {
                    id: el.id,
                    name: el.name,
                    genre: el.genre,
                    singlePlayer: el.singlePlayer,
                    multiplayer: el.multiplayer,
                    platform: el.platform,
                    release: el.release,
                    updated_at: el.updated_at,
                    created_at: el.created_at,
                };
            });
            this.setState({ data });
        });
    }

    render() {
        const columns = [
            {
                title: "ID FIlm",
                field: "id",
            },
            {
                title: "Name",
                field: "name",
            },
            {
                title: "Genre",
                field: "genre",
            },
            {
                title: "Single Player",
                field: "singlePlayer",
            },
            {
                title: "Multi Player",
                field: "multiplayer",
            },
            {
                title: "Created",
                field: "created_at",
            },
            {
                title: "Last Update",
                field: "updated_at",
            },
        ];

        return (
            <>
            <SideBar/>
            <div style={{width:"70%", marginLeft:"340px"}}>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                ></link>
                {/* <MovieSearch /> */}
                <MaterialTable
                    title="Tabel Game's"
                    columns={columns}
                    data={this.state.data}
                    options={{
                        filtering: true,
                    }}
                />
                </div>
            </>
        );
    }
}

export default TableMovie;
