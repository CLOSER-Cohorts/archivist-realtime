# Archivist's Realtime Module
> (archivist-realtime)

Archivist is a bespoke webapp designed to allow the efficent and accurate documentation of questionnaires and other data collection instruments. Archivist Realtime is a single module of Archivist written using Node.js to provide a more responsive user experience.

Archivist Realtime currently has two key functions:
1. Provide live updates to the data held on all clients' browsers
2. Create a locking mechanism that prevents to clients editing the same object at the same time

## Live Updates
Updates begin propogation within the app layer of Archivist, after a change has been comitted to the database a message is published to Redis. This message is then recieved by Archvivist Realtime and further emitted onto the clients' browsers using Socket.io. As you can see, Archivist Realtime is a very thin middleware client for this process, most of the leg work is done wither in the app layer or the UI.

## Locking Mechanism
In order to prevent users being subjected to a race enviroment while editing questionnaire metadata, an object is locked while it is being editted. This is done by the client notifying Archivist Realtime when it begins and ends editing an object. If the client disconnects all currently locked objects become unlocked. When a client connects, a list of all locked objects is sent to the client.
