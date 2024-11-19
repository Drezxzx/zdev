export async function createNotification({ userEmail, message, idPost, idProfile, idType, checkIfIsTheSame }: { userEmail: string, message: string, idType: "1" | "2" | "3", idPost: string, idProfile: string, checkIfIsTheSame: boolean }): Promise<boolean> {

    idPost === "" ? "0" : idPost
    idProfile === "" ? "0" : idProfile
  try {
    const res = await fetch("http://zdev.es/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkIfIsTheSame,
          userEmail,
          message,
          idType,
          idPost,
          idProfile,
        }),
      });
    
      return res.ok ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
   
  }
  
  export async function updateNotificacion({pageNumber, userEmail}: {pageNumber : number, userEmail : string }) {
    try {
      const res = await fetch("http://zdev.es/api/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          pageNumber,
        }),
      });
    
      return res.ok ? true : false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }