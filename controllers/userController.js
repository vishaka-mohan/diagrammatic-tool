const Doc = require('../models/Docs');
const User = require('../models/User');
const Feedback = require('../models/Feedback');

let currUser, currDoc='', currId;
//let numUsers;

module.exports.dashboard_get = async (req,res) => {

    try{

        currUser = res.locals.user.email;

        console.log(currUser);
        let result = await Doc.find({ userEmail: currUser }).exec();

        //console.log(result);

        res.render('dashboard', {result: result});
        
    }
    catch(err){
        console.log(err);
        next(err);
    }
    
    
}
module.exports.docs_get = async (req,res) => {
    


    try{
        console.log(res.locals.user.id);
        currId = res.locals.user.id;
        console.log("doccc: "+currDoc);

        const countDocs = await Doc.countDocuments({userEmail: currUser}).exec();

        let docName = "doc" + countDocs;
        currDoc = docName;
        console.log(currDoc);
        
        
        res.render('workspaceNormal', {canvasObject: '', userId: res.locals.user.id, currDoc: currDoc});
        

    }
    catch(err){

        console.log(err);
        next(err);
    }

    
}

module.exports.docs_post = async (req,res) => {

    try{
        console.log("logging");
        console.log(req.body);
        console.log(currUser);
        var content = JSON.stringify(req.body);
        
        //console.log("hello " + countDocs);

       const countDocs = await Doc.countDocuments({userEmail: currUser}).exec();

       let docName = "doc" + countDocs;

       console.log(countDocs);
       console.log(docName);
        

        let doc = new Doc({userEmail: currUser, docName: docName, content: content }) ;
        
        await doc.save(function (err, doc) {

            if (err) return console.error(err);
            console.log(doc.docName + " saved to bookstore collection.");
            
            console.log('/workspace/'+ currId + '/' + docName);
            res.redirect('/workspace/'+ currId + '/' + currDoc);
            //res.render('workspaceNormal', {canvasObject: content, userId: currId, currDoc: currDoc});
          });
          currDoc = docName;
          console.log("current document: "+currDoc);
         


    }
    catch(err) {

        console.log(err);

    }
       
    
}

module.exports.saved_docs_get = async (req,res) => {
    


    try{
        
        console.log(res.locals.user.id);
        currUser = res.locals.user.email;
        currId = req.params.id;
        console.log("curr id"+ currId);
         currDoc = req.params.docName;

        let userNow = await User.find({_id: currId});
        console.log(userNow[0].email);

        let result = await Doc.find({ userEmail : userNow[0].email , docName: currDoc }).exec();
        let canvasObject = JSON.parse(Object.keys(JSON.parse(result[0].content))[0]);
        console.log(canvasObject);
        res.render('workspaceNormal', {canvasObject: canvasObject, userId: res.locals.user.id, currDoc: req.params.docName  });

    }
    catch(err){

        console.log(err);
        next(err);
    }

    
}


module.exports.saved_docs_post = async (req,res) => {

    try{
        console.log("logging");
        //console.log(req.body);
        console.log("logiing current user");
        
        console.log(currUser);
        var content = JSON.stringify(req.body);
        //currId = req.params.id;
        console.log(currId);
        let userNow = await User.find({_id: currId});
        console.log(userNow[0].email);
        
        
        console.log("logging curr doc" + currDoc);
        

        await Doc.findOneAndUpdate({ userEmail : userNow[0].email, docName: currDoc }, {content: content});

    }
    catch(err){

        console.log(err);
    }
       
    
}




module.exports.saved_docs_collab_get = async (req,res) => {
    

    
    try{

        let history = [];
        const io = res.locals['socketio'];
        const users = {};
        

        io.once('connection', function(socket){
            console.log('a user connected', socket.id);
            console.log( socket.client.conn.server.clientsCount + " users connected" );
            //numUsers = socket.client.conn.server.clientsCount;
            
            // socket.broadcast.to(socket.id).emit('drawing', canvasData);

            for(let item of history)
                socket.emit('drawing',item);

            

            socket.on('disconnect', () => {
                history = [];
                socket.broadcast.emit('user-disconnected', users[socket.id])
                delete users[socket.id]
                //console.log('user disconnected');
            });

            socket.on('ready', msg => {
                console.log(msg);
            });

            socket.on('drawing', canvasJson => {
                //console.log("Drawing");
                canvasData = canvasJson;
                history.push(canvasData);
                socket.broadcast.emit('drawing', canvasData);
            });

            socket.on('new-user', name => {
                users[socket.id] = name
                socket.broadcast.emit('user-connected', name)
            });

            socket.on('send-chat-message', message => {
                socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
            });

    });
        
        console.log(res.locals.user.id);
        currUser = res.locals.user.email;
        currId = req.params.id;
        console.log("curr id"+ currId);
         currDoc = req.params.docName;

        let userNow = await User.find({_id: currId});
        console.log(userNow[0].email);

        let result = await Doc.find({ userEmail : userNow[0].email , docName: currDoc }).exec();
        let canvasObject = JSON.parse(Object.keys(JSON.parse(result[0].content))[0]);
        console.log(canvasObject);
        console.log(io.engine.clientsCount);
        if(io.engine.clientsCount > 3){
            res.render('error');
        }
        else{
            res.render('workspaceCollab', {canvasObject: canvasObject, userId: res.locals.user.id, currDoc: req.params.docName  });
        }
        

    }
    catch(err){

        console.log(err);
        next(err);
    }

    
}


module.exports.saved_docs_collab_post = async (req,res) => {

    try{
        console.log("logging");
        //console.log(req.body);
        console.log("logiing current user");
        
        console.log(currUser);
        var content = JSON.stringify(req.body);
        //currId = req.params.id;
        console.log(currId);
        let userNow = await User.find({_id: currId});
        console.log(userNow[0].email);
        
        
        console.log("logging curr doc" + currDoc);
        

        await Doc.findOneAndUpdate({ userEmail : userNow[0].email, docName: currDoc }, {content: content});

    }
    catch(err){

        console.log(err);
    }
       
    
}

module.exports.feedback_get = (req,res) => {
    currUser = res.locals.user.email;
    res.render('feedback');
}

module.exports.feedback_post = async (req,res) => {
    try{
        console.log(req.body);
    console.log(currUser);
    let feedback = new Feedback({userEmail: currUser, title: req.body.title, content: req.body.content }) ;
        
        await feedback.save(function (err, doc) {

            if (err) return console.error(err);
            console.log(feedback.title + " saved.");

          });
    }catch(err){
        console.log(err);
    }
    
     res.render('feedback');
}


module.exports.adDashboard_get = async (req,res) => {
   
        await Feedback.find({}, function(err, feedbacks) {
            console.log(feedbacks);
            res.render('adDashboard', {feedbacks: feedbacks});
            
         });
        
    
    
}