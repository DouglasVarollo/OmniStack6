import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {formatDistance, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../services/api';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import socket from 'socket.io-client';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

export default class Box extends Component {
  state = {
    box: {},
  };

  async componentDidMount() {
    const box = await AsyncStorage.getItem('@RocketBox:box');

    this.subscribeToNewFiles();

    const response = await api.get(`/boxes/${box}`);

    this.setState({box: response.data});
  }

  subscribeToNewFiles = box => {
    const io = socket('http://192.168.1.5:3333');

    io.emit('connectRoom', box);
    io.on('file', data => {
      this.setState({
        box: {
          ...this.state.box,
          files: [data, ...this.state.box.files],
        },
      });
    });
  };

  openFile = async file => {
    try {
      const filePath = `${RNFS.DocumentDirectoryPath}/${file.title}`;

      await RFNS.downloadFile({
        fromUrl: file.url,
        toFile: filePath,
      });

      await FileViewer.open(filePath);
    } catch (err) {
      console.log('Arquivo não suportado...');
    }
  };

  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this.openfile(item)} style={styles.file}>
      <View style={styles.fileInfo}>
        <Icon name="insert-drive-file" size={24} color="#A5CFFF" />
        <Text style={styles.fileTitle}>{item.title}</Text>
      </View>
      <Text style={styles.fileDate}>
        há{' '}
        {formatDistance(parseISO(item.createdAt), new Date(), {
          locale: pt,
        })}
      </Text>
    </TouchableOpacity>
  );

  handleUpload = () => {
    ImagePicker.launchImageLibrary({}, async upload => {
      if (upload.error) {
        console.log('Image picker error');
      } else if (upload.didCancel) {
        console.log('Cancelled by user');
      } else {
        const data = new FormData();
        const [prefix, suffix] = upload.fileName.split('.');
        const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix;

        data.append('file', {
          name: `${prefix}.${ext}`,
          type: upload.type,
          uri: upload.uri,
        });

        api.post(`/boxes/${this.state.box._id}/files`, data);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.boxTitle}>{this.state.box.title}</Text>
        <FlatList
          style={styles.list}
          data={this.state.box.files}
          keyExtractor={file => file._id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={this.renderItem}
        />

        <TouchableOpacity style={styles.fab} onPress={this.state.handleUpload}>
          <Icon name="cloud-upload" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    );
  }
}
