import styles from "@/styles/BookStore.module.scss";
import Image from "next/image";
import title1 from "../../public/img/title1.jpg";
import title2 from "../../public/img/title2.jpg";
import title3 from "../../public/img/title3.jpg";
import title4 from "../../public/img/title4.jpg";
import { Star, Cart } from "@/components/icons";
import Link from "next/link";

const Books = () => {
  return (
    <section className={styles.bookSection}>
      <div className={styles.booksWrapper}>
        <div className={styles.top}>
          <h3 className={styles.header}>
            Partnered with inspiring collaborators and brands
          </h3>
        </div>

        <div className={styles.filter}>
          <div className={styles.input}>
            <input type="text" placeholder="search for a title" />
          </div>
          <button className={styles.searchBtn}>Search</button>
        </div>

        <div className={styles.bookWrapper}>
          <div className={styles.book}>
            <Link href="/books/aesop-fable" className={styles.thumb}>
              <span className={styles.price}>$15</span>
              <Image src={title1} alt="Title 1" />
            </Link>
            <div className={styles.details}>
              <div className={styles.title}>
                <h3>Aesop's Fable Aesop's Fable Aesop's Fable </h3>
              </div>

              <p className={styles.summary}>
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Dolorum.
              </p>

              <div className={styles.bottom}>
                <div className={styles.starWrapper}>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>

                <div className={styles.selector}>
                  <Cart /> <span>Add</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.book}>
            <div className={styles.thumb}>
              <span className={styles.price}>$15</span>
              <Image src={title4} alt="Title 1" />
            </div>
            <div className={styles.details}>
              <div className={styles.title}>
                <h3>Aesop's Fable Aesop's Fable Aesop's Fable </h3>
              </div>

              <p className={styles.summary}>
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Dolorum.
              </p>

              <div className={styles.bottom}>
                <div className={styles.starWrapper}>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>

                <div className={styles.selector}>
                  <Cart /> <span>Add</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.book}>
            <div className={styles.thumb}>
              <span className={styles.price}>$15</span>
              <Image src={title3} alt="Title 1" />
            </div>
            <div className={styles.details}>
              <div className={styles.title}>
                <h3>Aesop's Fable Aesop's Fable Aesop's Fable </h3>
              </div>

              <p className={styles.summary}>
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Dolorum.
              </p>

              <div className={styles.bottom}>
                <div className={styles.starWrapper}>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>

                <div className={styles.selector}>
                  <Cart /> <span>Add</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.book}>
            <div className={styles.thumb}>
              <span className={styles.price}>$15</span>
              <Image src={title2} alt="Title 1" />
            </div>
            <div className={styles.details}>
              <div className={styles.title}>
                <h3>Aesop's Fable Aesop's Fable Aesop's Fable </h3>
              </div>

              <p className={styles.summary}>
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Dolorum.
              </p>

              <div className={styles.bottom}>
                <div className={styles.starWrapper}>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>

                <div className={styles.selector}>
                  <Cart /> <span>Added</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.book}>
            <div className={styles.thumb}>
              <span className={styles.price}>$15</span>
              <Image src={title1} alt="Title 1" />
            </div>
            <div className={styles.details}>
              <div className={styles.title}>
                <h3>Aesop's Fable Aesop's Fable Aesop's Fable </h3>
              </div>

              <p className={styles.summary}>
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Dolorum.
              </p>

              <div className={styles.bottom}>
                <div className={styles.starWrapper}>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>

                <div className={styles.selector}>
                  <Cart /> <span>Add</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.book}>
            <div className={styles.thumb}>
              <span className={styles.price}>$15</span>
              <Image src={title4} alt="Title 1" />
            </div>
            <div className={styles.details}>
              <div className={styles.title}>
                <h3>Aesop's Fable Aesop's Fable Aesop's Fable </h3>
              </div>

              <p className={styles.summary}>
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Dolorum.
              </p>

              <div className={styles.bottom}>
                <div className={styles.starWrapper}>
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>

                <div className={styles.selector}>
                  <Cart /> <span>Add</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Books;
