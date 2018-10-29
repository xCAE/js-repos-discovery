import React from 'react';
import Moment from 'moment';

export const Repository = (props) => {
    const {owner, url, name, description, stargazers, createdAt} = props;

    const created = Moment(createdAt).format('YYYY-MM-DD');
    
    return (
        <div className='col-sm-12 width-full py-4 border-bottom text-left'>
            <div className='d-flex'>
                 <a className='d-block mr-2 mt-1' href={owner.url} title={owner.login}>
                     <img 
                        src={owner.avatarUrl} 
                        className='avatar rounded-1' 
                        width='32' 
                        height='32' 
                        alt={`@${owner.login}`}
                    />
                 </a>
                 <div className='width-full'>
                     <div className='mb-1'>
                         <h3 className='h3'>
                             <a 
                                style={{maxWidth: '90%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'wrap', verticalAlign: 'top' }} 
                                href={url}
                             >
                                <div className='text-normal '>{owner.login}/{name}</div>
                             </a>
                         </h3>
                     </div>
                     <p className='text-gray mb-2 pr-4'>
                         {description}
                     </p>
                     <div className='f6 text-gray mt-2 d-flex align-items-center'>
                         <span className='mr-3'>JavaScript</span>
                         <span className='mr-3'>Stars: {stargazers.totalCount}</span>
                         <span>Created at {created}</span>
                     </div>
                 </div>
             </div>
         </div>
    )
};

export default Repository;