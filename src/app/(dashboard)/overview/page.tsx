import Link from "next/link";

export default function Overview() {
    return (
      <div>
            <h1>Hello World!</h1>
            
            <Link href={'/users'}>Manage Users</Link>
      </div>
    );
  }
  