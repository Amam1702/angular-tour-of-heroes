export interface CreateRequest {
    create: {
      fileData: Uint8Array[]; // Also, is this correct representation of byte array?
    };
  }