import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Linking,
  ScrollView, Alert
} from "react-native";

const UserProfile = ({
  name,
  location,
  description,
  imageUrl,
  links,
}: {
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  links: { url: string; text: string }[];
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newLink, setNewLink] = useState({ url: "", text: "", profilePicture: "", profileName: "" });

  const handleAddLinkPress = () => {
    setModalVisible(true);
  };

  const handleCancelLinkPress = () => {
    setModalVisible(false);
    setNewLink({ url: "", text: "", profilePicture: "", profileName:"" });
  };

  const handleSaveLinkPress = async () => {
    if (newLink.url && newLink.text && newLink.profilePicture && newLink.profileName) {
      try {
       
        links.push({ url: newLink.url, text: newLink.text });
  
        const response = await fetch('http://192.168.1.11:3001/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newLink),
        });
  
        if (response.ok) {
          console.log('New link added:');
          console.log('URL:', newLink.url);
          console.log('Text:', newLink.text);
          setModalVisible(false);
          setNewLink({ url: '', profilePicture: '', text: '', profileName: ""});
        } else {
          console.error('error sending data');
          Alert.alert('an error occurred while sending the data.');
        }
      } catch (error) {
        console.error('request error:', error);
        Alert.alert( 'an error occured in the request.');
      }
    } else {
      Alert.alert('please fill aut all fields.');
    }
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.DataContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.profileImage} />
          </View>
          <View style={styles.profileTextContainer}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.locationText}>{location}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>
         <ScrollView style={styles.linksContainer}>
         <View >
            {links.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.linkButton}
                onPress={() => Linking.openURL(link.url)}
              >
                <Text style={styles.linkText}>{link.text}</Text>
              </TouchableOpacity>
            ))}
            
          </View>   
         </ScrollView>
         <TouchableOpacity style={styles.addLinkButton} onPress={handleAddLinkPress}>
              <Text style={styles.addLinkText}>+ New Link</Text>
            </TouchableOpacity>
          
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.ContainerNewLink}>
          <View style={styles.ContentNewLink}>
            <Text style={styles.modalTitle}>Add a new link</Text>
            <TextInput
              style={styles.input}
              placeholder="URL"
              value={newLink.url}
              onChangeText={(text) => setNewLink({ ...newLink, url: text, profilePicture: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Text"
              value={newLink.text}
              onChangeText={(text) => setNewLink({ ...newLink, text: text, profileName: text })}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelLinkPress}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveLinkPress}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#131313",
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    width: 500,
    
  },
  DataContainer: {
    flexDirection: "column",
    backgroundColor: "#1F1F1F",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 30,
    width: "80%",
    maxWidth: 500,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2, // Ancho del borde
    borderColor: "black", // Color del borde
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -5,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: "100%",
    height: "100%",
     
  },
  profileTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -15,
    maxWidth: 250,
  },
  nameText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  locationText: {
    fontSize: 18,
    color: "#C4DE6C",
    marginTop: 20,
  },
  descriptionText: {
    fontSize: 13,
    color: "#FFFFFF",
    marginTop: 40,
  },
  linksContainer: {
    marginTop: -20,
    maxHeight: 300, 
  },
  linkButton: {
    backgroundColor: "#333333",
    paddingVertical: 10,
    paddingHorizontal: 55,
    borderRadius: 10,
    marginBottom: 25,
    height: 52,
    width: 300, 
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 15,
    color: "#FFFFFF",
  },
  addLinkButton: {
    backgroundColor: "#A367FA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 30,
    height: 60,
    width: 300, 
    alignItems: "center",
    justifyContent: "center",
  },

addLinkText: {
  fontSize: 25,
  color: "#fff",
},
ContainerNewLink: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  
},

ContentNewLink: {
  backgroundColor: "#fff",
  padding: 20,
  borderRadius: 5,
  width: "100%",
  maxWidth: 300,
  shadowColor: "red",
  shadowOffset: {
    width: 0,
    height: 2,
  
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 30, // intencidad  de la sombra
  borderWidth: 1, // Ancho del borde
  borderColor: "red", // Color del borde
},


modalTitle: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 20,
},
input: {
  height: 35,
  borderColor: "#000",
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
  marginBottom: 15,
  width: "100%",
},
buttonContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 10,
},
cancelButton: {
  backgroundColor: "#FF0000",
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 5,
},
cancelText: {
  fontSize: 16,
  color: "#fff",
},
saveButton: {
  backgroundColor: "#A367FA",
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 5,
},
saveText: {
  fontSize: 16,
  color: "#fff",
},
});

export default UserProfile;