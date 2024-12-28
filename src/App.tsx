import React, { FormEventHandler, FormEvent, useState, ChangeEvent } from 'react'

const App: React.FC = () => {
  const [doc, setDoc] = useState<File | null>(null);
  const [showDownload, setShowDownload] = useState(false)

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0){
      setDoc(e.target.files[0]);
    }
    else {
      console.log('File list empty')
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) =>{ 
      e.preventDefault();
      const formData = new FormData();
      formData.append('file', doc ? doc : '');
      try {
        const response = await fetch('/', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.log('Error: ', error)
      }
      setShowDownload(true);
    }

  return (
    <>
    <div className="container d-flex vh-100">
      <div className='m-auto'>
        <form className="form-control" onSubmit={handleSubmit}>
          <label className="form-label my-1" htmlFor="doc">Select a Docx File </label>
          <input className='form-control my-1' type="file" name="doc" accept='.docx' onChange={handleChange}/>
          <button className='form-control btn btn-primary my-1' type="submit">Submit</button>   
            { showDownload ? 
            <div className='mx-auto my-1'>
              <a href='/download' className='form-control btn btn-primary'>Download XML</a>
            </div> : 
            <div></div>
            }
        </form>
      </div>
    </div>
    </>
  )
}

export default App
