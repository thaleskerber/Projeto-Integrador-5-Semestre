import {PermissionsAndroid} from 'react-native';
import {Equipment} from '../models';
import ImagePicker from 'react-native-image-crop-picker';
import {Files} from '../models';

async function requestReadImages(): Promise<boolean> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      {
        title: 'Permissão para abrir seus arquivos?',
        message:
          'Para selecionar uma foto para o equipamento precisamos da sua permissão para abrir os arquivos do dispositivo.',
        buttonNeutral: 'Me pergunte depois',
        buttonNegative: 'Negar',
        buttonPositive: 'Aceitar',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (e) {
    return false;
  }
}

async function updateEquipamentoImages(
  equipment: Equipment,
  setEquipment: React.Dispatch<React.SetStateAction<Equipment>>,
) {
  const selectedImages = await ImagePicker.openPicker({
    width: 150,
    height: 150,
    cropping: true,
    multiple: true,
    includeBase64: true,
    mediaType: 'photo',
  });
  const images: Files[] = equipment.files ? equipment.files : [];
  selectedImages.forEach(item => {
    const img: Files = {
      base64: item.data ?? '',
      type: item.mime,
    };

    images.push(img);
  });

  setEquipment({...equipment, files: images});
}

export {requestReadImages, updateEquipamentoImages};