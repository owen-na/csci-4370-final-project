import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {

    return (
        <div className="user-container">
          <header>
            <h1>Hello User</h1>
          </header>
          <main>
            <div>
              <button>View Your Cart</button>
              <button>Add A Wishlist</button>
              <button>View your Wishlist</button>
              <button>View Purchase History</button>
            </div>
          </main>
        </div>
      );
}
