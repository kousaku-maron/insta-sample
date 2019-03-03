import React, { Component } from 'react'
import { Platform, StyleSheet, View, Text, Dimensions } from 'react-native'
import { Container, Content, Header, Left, Thumbnail, Button, Item, Input, Badge } from 'native-base'
import { Icon, Permissions ,ImagePicker } from 'expo'
import { userCollection, uploadAvatar, db } from '../modules/firebase'

class ProfileEditScreen extends Component {
  constructor(props) {
    super(props)
    this.state={
      name: null,
      avatar: null,
      uploading: false,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
  })

  pickImage = async () => {
    let isAccepted = true

    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    
    if(permission.status !== 'granted') {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (newPermission.status !== 'granted') {
        isAccepted = false
      }
    }

    if(isAccepted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [9, 9]
      })

      if (!result.cancelled) {
        this.setState({ avatar: result.uri })
        console.log(result.uri)
      }
    }
  }

  updateProfile = async (properties) => {
    try{
      this.setState({ uploading: true })

      let downloadUrl = null
      if (this.state.avatar) {
        downloadUrl = await uploadAvatar(this.state.avatar)
      }

      const batch = db.batch()
      const userRef = userCollection.doc(this.props.user.uid)

      await batch.set(userRef, { name: properties.name, avatar: downloadUrl })
      await batch.commit().then(() => {
        console.log('edit user success.')
      })

      this.setState({
        name: null,
        avatar: null,
      })

      this.props.navigation.goBack()
    }
    catch(e) {
      console.log(e)
      alert('Upload avatar image failed, sorry :(')
    }
    finally {
      this.setState({ uploading: false })
    }
  }

  render () {
    if(this.props.user.uid) {

      const tempAvatar = 'https://firebasestorage.googleapis.com/v0/b/novels-a5884.appspot.com/o/temp%2Ftemp.png?alt=media&token=a4d36af6-f5e8-49ad-b9c0-8b5d4d899c0d'

      return (
        <Container style={styles.container}>
          <Header transparent>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon.Ionicons
                  name={
                    Platform.OS === 'ios'
                    ? 'ios-arrow-back'
                    : 'md-arrow-back'
                  }
                  size={24}
                  style={styles.backButton}
                  color='black'
                />
              </Button>
            </Left>
          </Header>
          
          <Content>            
            <View style={styles.content}>
              {this.state.avatar? (
                <Thumbnail
                  large
                  source={{ uri: this.state.avatar? this.state.avatar : tempAvatar }}
                  style={styles.avatar}
                />
              ) : (
                <Thumbnail
                  large
                  source={{ uri: this.props.user.properties.avatar? this.props.user.properties.avatar : tempAvatar }}
                  style={styles.avatar}
                />
              )}

              <Badge style={styles.iconButton}>
                <Icon.AntDesign
                  name='plus'
                  size={50}
                  color='white'
                  onPress={this.pickImage}
                />
              </Badge>

              <Item style={styles.name} rounded>
                <Input
                  placeholder={this.props.user.properties.name}
                  onChangeText={name => this.setState({ name })}
                />
              </Item>

              <Button
                style={styles.button}
                dark
                rounded
                onPress={() => this.updateProfile(this.state)}
                disabled={this.state.uploading}
              >
                <Text style={styles.buttonText}>プロフィールを保存</Text>
              </Button>
            </View>
          </Content>
        </Container>
      )
    }
    else {
      return (
        <View style={styles.notLoginContainer}>
          <Text>Error</Text>
        </View>
      )
    }
  }
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notLoginContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    position: 'relative',
    width: width*2/3,
    height: width*2/3,
    borderRadius: width/3,
    margin: 20,
  },
  iconButton: {
    position: 'absolute',
    top: width*6/11,
    right: width/7,
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  name: {
    width: width*2/3,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
  }
})

export default ProfileEditScreen
