"use client";
import styles from "./styles.module.css";

import MenuCategoria from "@/components/menu_categoria/page";
import MenuCard from "@/components/menu_card/menu_card";

type Props = {};
const Menu = (props: Props) => {
  return (
    <div className={styles.container}>
      <MenuCategoria title={"Cadastrar"} className={styles.categoria}>
        <MenuCard
          title={"Cadastrar acolhido"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
      </MenuCategoria>

      <MenuCategoria title={"Consultar"} className={styles.categoria}>
        <MenuCard
          title={"Consultar acolhido"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
        <MenuCard
          title={"Exemplo de card"}
          onClick={(e) =>
            alert(`Clicou em "${e.currentTarget.attributes[1].value}"`)
          }
        />
      </MenuCategoria>
    </div>
  );
};
export default Menu;
