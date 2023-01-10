import './memberPageSkeleton.css'
const MemberPageSkeleton = () => {

    return(
        <div className='memberSkeletonContainer'>
            <section  className='memberSkeletonSection'>
                some thing on here...
            </section>
            <section className='thumbSkelcontainer'>
                <div className='memberThumbSkel'></div>
                <div className='memberThumbSkel'></div>
                <div className='memberThumbSkel'></div>
                <div className='memberThumbSkel'></div>
            </section>
        </div>
    )
}

export default MemberPageSkeleton