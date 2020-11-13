# Smart Campus Dashboard Project 


### Requirements

Smart Campus Dashboard – IoT application that generates a single visualization for all data gathered from the sensors across campus that run on their own Raspberry Pi computer.

The application is not concerned with the actual sensors/devices. It is meant to gather data in a single place in the best way possible. Thus, the data it deals with may not even be real (mock data). However, it should be easy for the application to quickly switch from mock data to real data whenever it is available. To achieve that, the project considers how a real sensor/device would communicate to the backend in order to provide data reliably.

In the case of advanced devices, such as headcount sensors, the application relies on the device to perform the required computations locally, and only send the end result.

An important requirement is that the application is scalable and could potentially support thousands of concurrent users. This is a realistic number as the application is targeted towards UofG students and staff, which exceed 30000.
The application and its underlying infrastructure should be reliable. If any server or related artifact fails, the service should not fail with it.

### Users

This project has the potential to be used by many people, whom I expect to be primarily University of Glasgow staff and students. In the case of staff, the application could tell them various data in order to help them make decisions. For example, the number of students going on University Avenue at 9pm, or the number of students using a newly established study space. This information can help staff make better educated decisions, such as focusing security in places with more traffic.

The application can be used by students too, and I expect them to be interested in things such as how full the library, gym or other places of interest are or information on any events on campus. 

### Architecture

The project assumes the use of a Raspberry Pi computer on each sensor present in the ecosystem. Because of this, many issues regarding IoT devices are avoided, as the Raspberry Pi is a capable card-size computer that comes preinstalled with WiFi technology. This makes it very easy for a sensor to use the Raspberry Pi as a gateway to the database/server, as opposed to having to use a separate, external gateway for protocols such as LoRa, which are very common in IoT projects. 

A diagram of the architecture the project employes is attached below, followed by an explanation.

![Architecture Info]("img/architecture.png")


The sensors gather their data and send it to the MongoDB via the MQTT protocol. MQTT (Message Queuing Telemetry Transport) is a common protocol in IoT devices because it is lightweight and efficient, suitable for devices with low resources such as microcontrollers. In the project's case MQTT was chosen because it showed better performance compared to HTTP, which is a verbose protocol, and is therefore more suitable for the Raspberry Pi. It also gives the user a choice of devices, as MQTT would allow the use of microcontrollers such as Arduinos.

MQTT broker subscribes to all sensors and reads their data, saving it in a collection in MongoDB. The use of a database was not required, but it would allow users to see data histories on the dashboard, adding more value and usability to the application. MongoDB was chosen as it is a NoSQL database and can store data in collections as JSON. Implementing it is easier than SQL, which would need to be split into tables and joined for space efficiency, and the JSON nature of the data will make it easy for the frontend to use it.

The REST API is a Flask program that defines URLs in views that query the database and return the results. The flow of the application is the frontend makes requests to the Flask server to obtain the data it needs to display and the server returns the data it gets from the database, all while the devices add new data or update existing data.

However, as I previously mentioned, the application is not concerned with whether the data is real or not, and collecting data is beyond the scope of this project. For this reason, the majority of the data that the frontend will display is mock data, generated randomly or by adding noise to data collected from the sensor prototype.
