import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${crypto.randomUUID()}-${
    newCabin.image.name
  }`.replaceAll('/', '');

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created'
    );
  }

  return data;
}

export async function createUpdateCabin(newCabin, id) {
  const hasNewImage = typeof newCabin.image === 'object';

  const imageName = `${crypto.randomUUID()}-${
    newCabin.image.name
  }`.replaceAll('/', '');

  const imagePath = hasNewImage
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : newCabin.image;

  // 1. Create/Update cabin
  let query = supabase.from('cabins');

  // A. CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B. UPDATE
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created/updated');
  }

  if (hasNewImage) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from('cabins').delete().eq('id', data.id);
      console.error(storageError);
      throw new Error(
        'Cabin image could not be uploaded and the cabin was not created/updated'
      );
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
}
