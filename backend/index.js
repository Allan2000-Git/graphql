const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cors = require("cors");
const { clients, projects } = require("./sample_data");
const connectDB = require("./utils/db");
const Project = require("./models/Project");
const Client = require("./models/Client");

async function startServer(){
    const app = express();
    const port = process.env.PORT || 8000;
    const server = new ApolloServer({
        typeDefs:`
            type Client {
                id: ID!,
                name: String!, # Can't return null
                email: String!,
                phone: String!
            }

            enum ProjectStatus {
                ASSIGNED
                UNASSIGNED
                IN_PROGRESS
                COMPLETED
            }

            type Project {
                id: ID!,
                name: String!,
                description: String!,
                status: ProjectStatus,
                clientId: Client!
            }

            type Query {
                getAllClients: [Client]
                getClient(id: String!): Client
                getAllProjects: [Project]
                getProject(id: String!): Project
            }

            type Mutation {
                addClient(name: String!, email: String!, phone: String!): Client
                deleteClient(id: ID!): Client
                addProject(name: String!, description: String!, status: ProjectStatus!, clientId: String!): Project
                deleteProject(id: ID!): Project
                updateProject(id: ID!, name: String, description: String, status: ProjectStatus): Project
            }
        `,
        resolvers:{
            Project:{
                clientId: async (parent, args) => {
                    return await Client.findById(parent.clientId);
                }
            },
            Query:{
                getClient: async (parent, args) => {
                    return await Client.findById(args.id)
                },
                getAllClients: async () => {;
                    return await Client.find({});
                },
                getProject: async (parent, args) => {
                    return await Project.findById(args.id);
                },
                getAllProjects: async () => {;
                    return await Project.find({});
                },
            },
            Mutation:{
                addClient: async (parent, { name, email, phone }) => {
                    const newClient = await Client({ name, email, phone });
                    return newClient.save();
                },
                deleteClient: async (parent, {id}) => {
                    Project.find({ clientId: id }).then((projects) => {
                        projects.forEach((project) => {
                            project.deleteOne();
                        });
                    });
                    const client = await Client.findByIdAndDelete(id);
                    return client;
                },
                addProject: async (parent, { name, description, status = "UNASSIGNED", clientId }) => {
                    const newProject = await Project({ name, description, status, clientId });
                    return newProject.save();
                },
                deleteProject: async (parent, {id}) => {
                    const project = await Project.findByIdAndDelete(id);
                    return project;
                },
                updateProject: async (parent, { id, name, description, status }) => {
                    const updatedproject = await Project.findByIdAndUpdate(id, {name, description, status}, {new: true});
                    return updatedproject;
                }
            }
        }
    })

    app.use(bodyParser.json());
    app.use(cors());

    connectDB();

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    })
}

startServer()