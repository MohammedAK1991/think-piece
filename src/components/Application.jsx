import React, { Component } from 'react';
import Authentication from './Authentication'
import { firestore, auth } from '../firebase';
import {collectIdsAndDocs} from '../utitlities';

import Posts from './Posts';

class Application extends Component {
    state = {
        posts: [],
        user: null,
    };

    // handleCreate = async post => {
    //     const { posts } = this.state;
    //     const docRef = await firestore.collection('posts').add(post)
    //     const doc = await docRef.get()
    //     // console.log(doc);
    //     const newPost = collectIdsAndDocs(doc);
    //     console.log(newPost)
    //     this.setState({ posts: [newPost, ...posts] });
    // };

    handleRemove = async id => {
      // const allPosts = this.state.posts;
      // firestore.doc(`posts/${id}`).delete()
      firestore.collection("posts").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
      // const posts = allPosts.filter(post => post.id !== id)
      // this.setState({posts});
      console.log('remoed', id)
    }

    unsubscribeFromFirestore = null
    unsubscribeFromAuth = null

    async componentDidMount() {

        // const snapshot = await firestore.collection('posts').get()
        // console.log({ snapshot });
        // const posts = snapshot.docs.map(collectIdsAndDocs)
        //     // snapshot.forEach(doc => {
        //     //     const id = doc.id;
        //     //     const data = doc.data()
        //     //     console.log({ id, data })
        //     // })
        // console.log({ posts });
        // this.setState({ posts });
        this.unsubscribeFromFirestore = await firestore.collection('posts').onSnapshot(snapshot => {
          const posts = snapshot.docs.map(collectIdsAndDocs)
          this.setState({ posts })
        })
        this.unsubscribeFromFirestore = auth.onAuthStateChanged(user => this.setState({user}))
    }

    componentWillUnmount () {
      this.unsubscribeFromFirestore()
      this.unsubscribeFromAuth()
    }

    render() {
        const { posts, user } = this.state;

        return (
          <main className = "Application">
            <h1> Think Piece </h1>
            <Authentication user={user}/>
            <Posts posts = { posts } onCreate = { this.handleCreate } />
          </main>
        );
    }
}

export default Application;